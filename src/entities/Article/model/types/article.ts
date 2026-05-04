import { User } from '@/entities/User';
import { ArticleBlockType, ArticleType } from '../const/const';

export interface ArticleBaseBlock {
	id: string;
	type: ArticleBlockType;
}
export interface ArticleCodeBlock extends ArticleBaseBlock {
	type: ArticleBlockType.CODE;
	code: string;
}
export interface ArticleImageBlock extends ArticleBaseBlock {
	type: ArticleBlockType.IMAGE;
	src: string;
	title: string;
}
export interface ArticleTextBlock extends ArticleBaseBlock {
	type: ArticleBlockType.TEXT;
	paragraphs: string[];
	title?: string;
}
export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface Article {
	id: string;
	title: string;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	user: User;
	type: ArticleType[];
	blocks: ArticleBlock[];
}
