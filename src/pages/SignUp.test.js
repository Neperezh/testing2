import { describe, expect, it, vi} from "vitest";
import SignUp from "./SignUp.vue";
import {screen, waitFor} from "@testing-library/dom";
import { render } from "@testing-library/vue";
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
