import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Group from '@/types/Group';
import GroupSettingModal from '@/components/modals/GroupSettingModal';
import CardSkeleton from '@/components/utils/CardSkeleton';
import GroupEditBar from '@/components/group/GroupEditBar';
import GroupHeadCount from '@/components/group/GroupHeadCount';
import GroupCardContainer from '@/components/group/GroupCardContainer';

export default function Groups({ groups }: { groups: Group[] }) {
  const defaultValues = groups.map((group) => group.groupId.toString());

  return !groups.length ? (
    <CardSkeleton />
  ) : (
    <Accordion type="multiple" defaultValue={defaultValues}>
      {groups.map((curGroup) => (
        <AccordionItem
          key={curGroup.groupId}
          value={curGroup.groupId.toString()}
          className="relative overflow-hidden transition-all duration-500 ease-in-out"
        >
          {curGroup.isInEdit && (
            <GroupEditBar groups={groups} curGroup={curGroup} />
          )}
          <GroupSettingModal curGroup={curGroup} />
          <AccordionTrigger className="text-l p-2 text-darkblue md:p-4 md:text-2xl">
            <GroupHeadCount curGroup={curGroup} />
          </AccordionTrigger>
          <AccordionContent>
            <GroupCardContainer curGroup={curGroup} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
