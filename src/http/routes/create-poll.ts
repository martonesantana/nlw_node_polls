import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {
  app.post("/polls", async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
      poll_options: z.array(z.string()),
    });

    const { title, poll_options } = createPollBody.parse(request.body);

    const poll = await prisma.poll.create({
      data: {
        title,
        poll_options: {
          createMany: {
            data: poll_options.map((option) => {
              return { title: option };
            }),
          },
        },
      },
    });

    return reply.status(201).send({ pollId: poll.id });
  });
}
