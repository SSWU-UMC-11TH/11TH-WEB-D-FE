type memberRole = "leader" | "member";

type studyMember = {
  memberId: number;
  memberName: string;
  role: memberRole;
  githubId?: string;
};

const member1: studyMember = {
  memberId: 1,
  memberName: "윤",
  role: "leader",
};

const member2: studyMember = {
  memberId: 2,
  memberName: "광수",
  role: "member",
  githubId: "gwangsoo",
};

const members: studyMember[] = [member1, member2];

function getMemberInfo(memberId: number) {
  const foundMember = members.find(
    (member) => member.memberId === memberId
  );

  if (!foundMember) {
    return "존재하지 않는 회원입니다.";
  }

  const githubId =
    foundMember.githubId ?? "등록되지 않음";

  return (
    "이름: " +
    foundMember.memberName +
    ", 역할: " +
    foundMember.role +
    ", GitHub ID: " +
    githubId
  );
}

console.log(getMemberInfo(1));
console.log(getMemberInfo(2));
console.log(getMemberInfo(999));