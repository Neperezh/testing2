import { describe, expect, it, vi} from "vitest";
import SignUp from "./SignUp.vue";
import {screen, waitFor} from "@testing-library/dom";
import { cleanup, render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";


describe("signup", () => {
  it("redirects to the success page when signup is ok", async () => {
    const user = userEvent.setup();
    render (SignUp);
    document.routerPush = vi.fn();

    const emailInput = screen.getByLabelText("Your email");
    await user.click(emailInput);
    await user.keyboard("hola@gmail.com");

    const passwordInput = screen.getByLabelText("Your password");
    await user.click(passwordInput);
    await user.keyboard("1345156");

    const submitButton = screen.getByText("Signup");
    await user.click(submitButton);
    
    await waitFor(() =>{
      expect(document.routerPush).toHaveBeenCalledWith("/success");
    });
  });
});

describe("password", ()=> {
  it("check error if shortpassword", async () => {
    const user = userEvent.setup();
    cleanup()
    render (SignUp);
    document.routerPush = vi.fn();

    const emailInput = screen.getByLabelText("Your email");
    await user.click(emailInput);
    await user.keyboard("hola@gmail.com");

    const passwordInput = screen.getByLabelText("Your password");
    await user.click(passwordInput);
    await user.keyboard("134");

    const submitButton = screen.getByText("Signup");
    await user.click(submitButton);
    
    await waitFor(() =>{
      expect(screen.getByText("The password is too short")).toBeTruthy();
    })
  })
})

describe("Email", ()=> {
  it("Email already exists", async () => {
    const user = userEvent.setup();
    cleanup()
    render (SignUp);
    document.routerPush = vi.fn();

    const emailInput = screen.getByLabelText("Your email");
    await user.click(emailInput);
    await user.keyboard("danielramos@gmail.com");

    const passwordInput = screen.getByLabelText("Your password");
    await user.click(passwordInput);
    await user.keyboard("1342424");

    const submitButton = screen.getByText("Signup");
    await user.click(submitButton);
    
    await waitFor(() =>{
      expect(screen.getByText("Email already exists")).toBeTruthy();
    })
  })
})