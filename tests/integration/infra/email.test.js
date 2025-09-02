import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Repertório <contato@repertorio.com.br",
      to: "contato@repertorio.com.br",
      subject: "Teste de envio de email",
      text: "Olá, este é um teste de envio de email.",
    });

    await email.send({
      from: "Repertório <contato@repertorio.com.br",
      to: "contato@repertorio.com.br",
      subject: "Último email enviado",
      text: "Corpo do último email enviado.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contato@repertorio.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@repertorio.com.br>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email enviado.\r\n");
  });
});
