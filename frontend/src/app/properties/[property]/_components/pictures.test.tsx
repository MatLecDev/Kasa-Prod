import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Pictures from "./pictures";

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

jest.useFakeTimers();

const ONE_IMAGE   = ["img1.jpg"];
const MANY_IMAGES = ["img1.jpg", "img2.jpg", "img3.jpg"];

const openModal = () => fireEvent.click(screen.getByAltText("Image principale du logement"));

describe("When the modale is open,", () => {

    describe("and the first image appears, ", () => {
        it("should NOT show arrows if there's only one image", () => {
            render(<Pictures propertyPictures={ONE_IMAGE} />);
            openModal();

            expect(
                screen.queryByAltText("Icone afficher l'image suivante")
            ).not.toBeInTheDocument();
        });

        it("SHOULD show arrows if there's more than one image", () => {
            render(<Pictures propertyPictures={MANY_IMAGES} />);
            openModal();

            const arrows = screen.getAllByAltText("Icone afficher l'image suivante");
            expect(arrows).toHaveLength(2);
        });
    });

    describe("and the last image is displayed,", () => {
        const currentSrc = (): string => {
            act(() => jest.runAllTimers());
            return screen.getByAltText("Image du logement").getAttribute("src") ?? "";
        };

        it("SHOULD display the first image when pressing → from the last one", () => {
            render(<Pictures propertyPictures={MANY_IMAGES} />);
            openModal();

            const [, rightArrow] = screen.getAllByAltText("Icone afficher l'image suivante");

            fireEvent.click(rightArrow); // → img2
            currentSrc();
            fireEvent.click(rightArrow); // → img3
            currentSrc();

            fireEvent.click(rightArrow);
            expect(currentSrc()).toBe(MANY_IMAGES[0]);
        });

        it("SHOULD display the last image when pressing ← from the first one", () => {
            render(<Pictures propertyPictures={MANY_IMAGES} />);
            openModal();

            const [leftArrow] = screen.getAllByAltText("Icone afficher l'image suivante");

            fireEvent.click(leftArrow);
            expect(currentSrc()).toBe(MANY_IMAGES[MANY_IMAGES.length - 1]);
        });
    });

    describe("and user uses keyboard to navigate,", () => {
        const pressKey = (key: string) =>
            fireEvent.keyDown(window, { key });

        const currentSrc = (): string => {
            act(() => jest.runAllTimers());
            return screen.getByAltText("Image du logement").getAttribute("src") ?? "";
        };

        it("SHOULD display the next image after pressing →", () => {
            render(<Pictures propertyPictures={MANY_IMAGES} />);
            openModal();

            pressKey("ArrowRight"); // → img2
            currentSrc();
            pressKey("ArrowRight"); // → img3

            expect(currentSrc()).toBe(MANY_IMAGES[2]);
        });

        it("SHOULD display the previous image after pressing ←", () => {
            render(<Pictures propertyPictures={MANY_IMAGES} />);
            openModal();

            pressKey("ArrowLeft"); // wrap → img3
            currentSrc();
            pressKey("ArrowLeft"); // → img2

            expect(currentSrc()).toBe(MANY_IMAGES[1]);
        });

        it("arrow keys should NOT be working when there is only one image", () => {
            render(<Pictures propertyPictures={ONE_IMAGE} />);
            openModal();

            pressKey("ArrowRight");

            act(() => jest.runAllTimers());
            const images = screen.getAllByRole("img");
            expect(images[images.length - 1].getAttribute("src")).toBe(ONE_IMAGE[0]);
        });
    });
});
