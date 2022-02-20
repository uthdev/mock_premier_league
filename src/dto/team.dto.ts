import {  IsString } from 'class-validator';

class TeamDto {
  @IsString()
  public teamName: string;
}

export default TeamDto;