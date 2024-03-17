import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMiddleware } from './middlewares/auth.middleware';
import { RecUserEntity } from './entities';
import {
  CampaignCandidateController,
  CampaignChannelController,
  CampaignContactController,
  CampaignController,
  CampaignEventController,
  CampaignProposalPositionConditionController,
  CandidateController,
  CandidateEducationController,
  CandidateInterviewProcessController,
  CandidateLanguageController,
  CandidateQualificationController,
  CandidateSkillController,
  CandidateWorkingHistoryController,
  ChannelController,
} from './controllers';
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
  CandidateSkillEntity,
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
import {
  CampaignCandidateService,
  CampaignChannelService,
  CampaignContactService,
  CampaignEventService,
  CampaignProposalPositionConditionService,
  CampaignService,
  CandidateEducationService,
  CandidateInterviewProcessService,
  CandidateLanguageService,
  CandidateQualificationService,
  CandidateService,
  CandidateSkillService,
  CandidateWorkingHistoryService,
  ChannelService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecUserEntity,
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
      CandidateSkillEntity,
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
    CampaignCandidateController,
    CampaignChannelController,
    CampaignEventController,
    CampaignProposalPositionConditionController,
    CampaignController,
    CandidateEducationController,
    CandidateInterviewProcessController,
    CandidateWorkingHistoryController,
    CandidateLanguageController,
    CandidateQualificationController,
    CandidateSkillController,
    CandidateController,
    ChannelController,
    CampaignContactController,
  ],
  providers: [
    CampaignCandidateService,
    CampaignContactService,
    CampaignChannelService,
    CampaignEventService,
    ChannelService,
    CampaignProposalPositionConditionService,
    CampaignService,
    CandidateEducationService,
    CandidateInterviewProcessService,
    CandidateWorkingHistoryService,
    CandidateLanguageService,
    CandidateQualificationService,
    CandidateSkillService,
    CandidateService,
    ChannelService,
  ],
})
export class RecruitingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      CampaignCandidateController,
      CampaignChannelController,
      CampaignContactController,
      CampaignEventController,
      CampaignProposalPositionConditionController,
      CampaignController,
      CandidateEducationController,
      CandidateInterviewProcessController,
      CandidateWorkingHistoryController,
      CandidateLanguageController,
      CandidateQualificationController,
      CandidateController,
      ChannelController,
      CandidateSkillService,
    );
  }
}
