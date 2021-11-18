import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '@/users/user.entity';

@ObjectType()
@Entity('todos')
export class Todo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  completed!: boolean;

  @Field(() => User)
  @ManyToOne(() => User, user => user.todos)
  user!: User;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
