import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

export interface ArticleDetailCommentsShema extends EntityState<Comment> {
	isLoading: boolean;
	error: string | undefined;
}
