import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: 'cat id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: 'comemnts content',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: 'like count',
  })
  @Prop({
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: 'target cat id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
