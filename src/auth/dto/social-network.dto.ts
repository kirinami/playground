import { IsNotEmpty } from 'class-validator';

export class SocialNetworkDto {
  @IsNotEmpty()
  accessToken!: string;
}
