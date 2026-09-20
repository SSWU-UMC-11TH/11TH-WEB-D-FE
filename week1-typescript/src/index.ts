type memberInformation = {
	id: number;
	name: string;
	role: "leader" | "member";
	githubId?: string;
};

const members: memberInformation[] = [
	{

		id: 1,
		name: "허은빈",
		role: "leader",
		githubId: "heb0427",
	},
	{
		id: 2,
		name: "김서윤",
		role: "member",
	}
];

function findMember(id: number): memberInformation | undefined {
	return members.find((member) => member.id == id);
}

function getMember(id: number): string {
	const member = findMember(id);

	if (member === undefined) {
		return "존재하지 않는 회원입니다.";
	}

	const githubId = member.githubId ?? "GitHub ID가 없습니다.";

	return `ID: ${member.id}, 이름: ${member.name}, GitHub ID: ${githubId}`;
}

console.log(getMember(1));
console.log(getMember(2));
console.log(getMember(999));
