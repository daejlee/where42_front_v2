import { useEffect, useState } from 'react';
import authApi from '@/api/authApi';
import groupApi from '@/api/groupApi';
import adminApi from '@/api/adminApi';
import { useUserStore, useGroupsStore, useAddedMembersStore } from '@/lib/stores';

export default function useInfoSet() {
  const { setUser } = useUserStore();
  const { setGroups } = useGroupsStore();
  const { setAddedMembers } = useAddedMembersStore();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let userIntraId: number;
    let userDefaultGroupId: number;
    adminApi
      .getMyStatus()
      .then((res) => setIsAdmin(res.role === 'ADMIN'))
      .catch((err) => console.error(err));
    authApi
      .getMyInfo()
      .then((res) => {
        setUser(res);
        userIntraId = res.intraId;
        userDefaultGroupId = res.defaultGroupId;
      })
      .catch((err) => console.error(err));
    groupApi
      .getAllGroups()
      .then((res) => {
        const updatedGroups = res.map((group) => {
          if (group.groupId === userDefaultGroupId) {
            return { ...group, groupName: '친구 목록' };
          }
          return group;
        });
        const sortedGroup = [...updatedGroups].sort((a, b) => a.groupId - b.groupId);
        const defaultGroup = sortedGroup.find((group) => group.groupName === '친구 목록');
        if (defaultGroup) {
          sortedGroup.splice(sortedGroup.indexOf(defaultGroup), 1);
          sortedGroup.push(defaultGroup);
        }
        setGroups(sortedGroup);
        const allMemberIds = res.flatMap((group) => group.members.map((member) => member.intraId));
        allMemberIds.push(userIntraId);
        setAddedMembers(allMemberIds);
      })
      .catch((err) => console.error(err));
  }, [setAddedMembers, setGroups, setUser]);

  // 유저가 어드민인지 확인하고 반환합니다.
  return isAdmin;
}
