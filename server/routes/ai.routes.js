import express from 'express';
import { generateBlog } from '../controller/blog.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { generateArticle } from '../controller/article.controller.js';
import { generateImage} from '../controller/image-generate.controller.js';
import { resumeAnalyze } from '../controller/resume-analyze.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.route("/blog-generate").post(authMiddleware, generateBlog)

router.route("/article-generate").post(authMiddleware, generateArticle)


export default router;