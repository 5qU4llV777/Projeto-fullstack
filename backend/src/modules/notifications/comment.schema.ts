import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop()
  taskId: string = '';

  @Prop()
  userId: string = '';

  @Prop()
  content: string = '';
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
