import { oakCors } from "oakCors";

export default oakCors({
  origin: 'https://foxyhunter.blog',
  credentials: true,
  allowedHeaders: ['Content-Type'],
  methods: ['GET'],
});
