import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ type: String })
  title: string;

  @Prop({ type: Number })
  year: number;

  @Prop({ type: String })
  director: string;

  @Prop({ type: [String] })
  cast: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
