import { ArticleDetailCommentsShema } from './ArticleDetailCommentsShema';
import { ArticleDetailsRecommendationsShema } from './ArticleDetailsRecommendationsShema';

export interface ArticleDetailsPageShema {
  comments: ArticleDetailCommentsShema;
  recommendations: ArticleDetailsRecommendationsShema;
}
