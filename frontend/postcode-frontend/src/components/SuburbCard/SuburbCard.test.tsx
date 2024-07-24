import { MemoryRouter } from "react-router-dom";
import SuburbCard from "./SuburbCard";
import { render, screen } from "@testing-library/react";

describe("SuburbCard Component", () => {
  it("should render a title based on props", () => {
    render(
      <MemoryRouter>
        <SuburbCard
          suburb={{ id: 1, name: "example", population: 2000, postcode: 3000 }}
          handleDelete={() => console.log("delete")}
        />
      </MemoryRouter>
    );
    const title = screen.queryByText(/example/i);
    expect(title).toBeVisible();
  });
});
