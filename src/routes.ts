import express from "express";
import nodemailer from "nodemailer";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repositories";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3ea0f274f1028e",
    pass: "78d1bbab33ddd2",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  // await transport.sendMail({
  //   from: "Equipe Feedget <oi@feedget.com>",
  //   to: "Rafael Caixeta <caixetadev@gmail.com>",
  //   subject: "Novo feedback",
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join("\n"),
  // });

  return res.status(201).send();
});
