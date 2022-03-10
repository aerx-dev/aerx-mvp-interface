import TeamMember from "./TeamMember";

export default function TeamSection() {
    return (
        <section
            className="py-16 lg:pt-[227px] lg:pb-[269px] px-10 sm:px-10 md:py-28  sm:py-20"
            id="aboutUs"
        >
            <h2 className="font-bold text-[40px] leading-[57px] tracking-[0.2] text-center">
                Meet the Team
            </h2>
            <p className="text-lg font-medium leading-5 tracking-[0.2] text-center mb-6 sm:mb-10 md:mb-14 lg:mb-[67px]">
                Meet the awesome team behind Aerx
            </p>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                <TeamMember />
                <TeamMember />
                <TeamMember />
                <TeamMember />
                <TeamMember />
            </div>
        </section>
    );
}
