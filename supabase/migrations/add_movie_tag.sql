-- Run in Supabase SQL Editor if your project was created before the Movie tag was added
ALTER TYPE activity_tag ADD VALUE IF NOT EXISTS 'movie';
