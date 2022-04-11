import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
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

  @IsString()
  @Matches(
    /^\d{4}\/\d{4}$/,
    {
      message: 'Season must be in format YYYY/YYYY',
    }
  )
  season: string;
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
