import { Router } from 'express';

import * as diaryController from '../controllers/diary.controller';

const router = Router();

router.get('/', diaryController.getDiaries);

router.get('/:id', diaryController.getDiaryById);

router.get('/nosensitive', diaryController.getDiariesWithoutSensitive);

router.post('/', diaryController.addDiary);

export default router;
