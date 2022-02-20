import { IsEmail, IsString, Length } from 'class-validator';

class TeamDto {
  @IsString()
  public teamName: string;
}

export default TeamDto;