import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMiddleware } from '../../middlewares/auth.middleware';
import { IdeUserEntity } from '../identity/entities';
import { UserEntity } from '../recruiting/entities';
import { CampaignCandidateController } from './controllers';
import {
  CampaignCandidateEntity,
  CampaignChannelEntity,
  CampaignContactEntity,
  CampaignEntity,
  CampaignEventEntity,
  CampaignInternalReferCandidateEntity,
  CampaignPlanEntity,
  CampaignProposalPositionConditionEntity,
  CandidateEducationEntity,
  CandidateEntity,
  CandidateInterviewProcessEntity,
  CandidateLanguageEntity,
  CandidateQualificationEntity,
  CandidateSKillEntity,
  CandidateWorkingHistoryEntity,
  ChannelEntity,
  ContactEntity,
  ContactSkillEntity,
  EventEntity,
  InterviewProcessEntity,
  PositionEntity,
  ProposalEntity,
  ProposalPositionConditionEntity,
  ProposalPositionConditionSkillEntity,
  SkillEntity,
} from './entities';
import { CampaignCandidateService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IdeUserEntity,
      UserEntity,
      CampaignCandidateEntity,
      CampaignChannelEntity,
      CampaignContactEntity,
      CampaignEventEntity,
      CampaignInternalReferCandidateEntity,
      CampaignPlanEntity,
      CampaignProposalPositionConditionEntity,
      CampaignEntity,
      CandidateEducationEntity,
      CandidateInterviewProcessEntity,
      CandidateLanguageEntity,
      CandidateQualificationEntity,
      CandidateSKillEntity,
      CandidateWorkingHistoryEntity,
      CandidateEntity,
      ChannelEntity,
      ContactSkillEntity,
      ContactEntity,
      EventEntity,
      InterviewProcessEntity,
      PositionEntity,
      ProposalPositionConditionSkillEntity,
      ProposalPositionConditionEntity,
      ProposalEntity,
      SkillEntity
    ]),
  ],
  controllers: [
    CampaignCandidateController
  ],
  providers: [
    CampaignCandidateService
  ],
})
export class RecruitingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      CampaignCandidateController
    );
  }
}
