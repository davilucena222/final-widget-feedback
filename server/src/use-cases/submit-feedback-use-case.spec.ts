import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//funcionalidade para "espiar" se uma função foi chamada 
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

//cria uma camada de testes para a função específica
describe("Submit feedback", () => {
  //it é uma forma de sinalizar que "isso" está sendo testado 
  it("should be able to submit a feedback", async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "There is a bug",
      screenshot: "data:image/png;base64,iVBORw0dsuhaidhiuashdaiuhdisd",
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able send feedback without type", async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "There is a bug",
      screenshot: "data:image/png;base64,iVBORw0dsuhaidhiuashdaiuhdisd",
    })).rejects.toThrow();
  });

  it("should not be able send feedback without comment", async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64,iVBORw0dsuhaidhiuashdaiuhdisd",
    })).rejects.toThrow();
  });

  it("should not be able send feedback with an invalid screenshot", async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "There is a bug",
      screenshot: "test.jpg",
    })).rejects.toThrow();
  });
});