import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ActivityLog extends Document {
  @Prop()
  userId: string;

  @Prop()
  action: string;

  @Prop()
  details: string;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
