import { Request, Response } from 'express';

import diaryService from '../services/diary.service';

export const getDiaries = (req: Request, res: Response) => {
  res.send(diaryService.getEntries());
};

export const getDiaryById = (req: Request, res: Response) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (!diary) return res.sendStatus(404);
  res.send(diary);
};

export const getDiariesWithoutSensitive = (req: Request, res: Response) => {
  res.send(diaryService.getNonSensitiveEntries());
};

export const addDiary = (req: Request, res: Response) => {
  const data = req.body;
  const newDiary = diaryService.addEntry(data);
  res.json(newDiary);
};
