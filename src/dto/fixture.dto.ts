import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from '../interfaces/fixture.interface';

export class FixtureDto {
  @IsDateString()
  matchDate: Date;

  @IsString()
  @IsNotEmpty()
  homeTeam: string;

  @IsString()
  @IsNotEmpty()
  awayTeam: string;
}



export class UpdateFixtureDto extends FixtureDto {

  @IsInt()
  @IsOptional()
  homeTeamScore?: number;

  @IsInt()
  @IsOptional()
  awayTeamScore?: number;

  @IsOptional()
  status?: Status
}