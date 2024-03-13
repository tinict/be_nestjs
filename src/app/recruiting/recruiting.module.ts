import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMiddleware } from '../../middlewares/auth.middleware';
import { UserEntity } from '../recruiting/entities';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
  controllers: [],
  providers: [],
})
export class RecruitingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes();
  }
}
