import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt, onClick, priority, quality, sizes, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & {
        priority?: boolean;
        quality?: number;
        sizes?: string;
    }) => (
        <img src={src} alt={alt} onClick={onClick} {...props} />
    ),
}));

jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
}));

jest.mock("@/.service/favoriteService", () => ({
    addFavorite:    jest.fn().mockResolvedValue(null),
    deleteFavorite: jest.fn().mockResolvedValue(null),
}));

jest.mock("@/.service/isAuth", () => ({
    isAuth: jest.fn(),
}));

// ─── Imports après mock ───────────────────────────────────────────────────────

import { redirect }                    from "next/navigation";
import { addFavorite, deleteFavorite } from "@/.service/favoriteService";
import { isAuth }                      from "@/.service/isAuth";

const mockRedirect       = redirect       as unknown as jest.Mock;
const mockAddFavorite    = addFavorite    as unknown as jest.Mock;
const mockDeleteFavorite = deleteFavorite as unknown as jest.Mock;
const mockIsAuth         = isAuth         as unknown as jest.Mock;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PROPERTY_ID = "property-123";

const getButton = () => screen.getByRole("button");
const getIcon   = () => screen.getByAltText(`Like button de ${PROPERTY_ID}`);
const clickBtn  = () => fireEvent.click(getButton());

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("When a property card is created,", () => {

    beforeEach(() => jest.clearAllMocks());

    describe("and the favorite button is displayed, ", () => {
        it("SHOULD be gray if isLiked is false", () => {
            render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
            expect(getIcon().getAttribute("src")).toBe("/icons/favorite-gray.svg");
        });

        it("SHOULD be red if isLiked is true", () => {
            render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={true} />);
            expect(getIcon().getAttribute("src")).toBe("/icons/favorite-red.svg");
        });

        it("SHOULD apply class 'favorite' if isLiked is true", () => {
            render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={true} />);
            expect(getButton()).toHaveClass("favorite");
        });

        it("should NOT apply class 'favorite' if isLiked is false", () => {
            render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
            expect(getButton()).not.toHaveClass("favorite");
        });
    });

    describe("and the user is NOT authentified, ", () => {
        beforeEach(() => mockIsAuth.mockResolvedValue(false));

        it("SHOULD redirect to '/login' on click", async () => {
            render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
            clickBtn();
            await waitFor(() => expect(mockRedirect).toHaveBeenCalledWith("/login"));
        });

        it("should NOT call addFavorite or deleteFavorite on click", async () => {
            render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
            clickBtn();
            await waitFor(() => expect(mockRedirect).toHaveBeenCalled());
            expect(mockAddFavorite).not.toHaveBeenCalled();
            expect(mockDeleteFavorite).not.toHaveBeenCalled();
        });
    });

    describe("and the user IS authentified, ", () => {
        beforeEach(() => mockIsAuth.mockResolvedValue(true));

        describe("and isLiked is false, ", () => {
            it("SHOULD call addFavorite with the right propertyId", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
                clickBtn();
                await waitFor(() => expect(mockAddFavorite).toHaveBeenCalledWith(PROPERTY_ID));
            });

            it("should NOT call deleteFavorite", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
                clickBtn();
                await waitFor(() => expect(mockAddFavorite).toHaveBeenCalled());
                expect(mockDeleteFavorite).not.toHaveBeenCalled();
            });

            it("SHOULD set icon color to red", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
                clickBtn();
                await waitFor(() =>
                    expect(getIcon().getAttribute("src")).toBe("/icons/favorite-red.svg")
                );
            });

            it("SHOULD add the class 'favorite'", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={false} />);
                clickBtn();
                await waitFor(() => expect(getButton()).toHaveClass("favorite"));
            });
        });

        describe("and isLiked is true, ", () => {
            it("SHOULD call deleteFavorite with the right propertyId", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={true} />);
                clickBtn();
                await waitFor(() => expect(mockDeleteFavorite).toHaveBeenCalledWith(PROPERTY_ID));
            });

            it("should NOT call addFavorite", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={true} />);
                clickBtn();
                await waitFor(() => expect(mockDeleteFavorite).toHaveBeenCalled());
                expect(mockAddFavorite).not.toHaveBeenCalled();
            });

            it("SHOULD set icon color to gray", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={true} />);
                clickBtn();
                await waitFor(() =>
                    expect(getIcon().getAttribute("src")).toBe("/icons/favorite-gray.svg")
                );
            });

            it("SHOULD remove the class 'favorite'", async () => {
                render(<FavoriteButton propertyId={PROPERTY_ID} isLiked={true} />);
                clickBtn();
                await waitFor(() => expect(getButton()).not.toHaveClass("favorite"));
            });
        });
    });
});
