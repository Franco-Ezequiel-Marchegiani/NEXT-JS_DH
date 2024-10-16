import { FAQPageType } from "@/types/faq.types";
import FAQCard from "./FAQCard";

type FAQSectionProps = {
    sections: FAQPageType[];
}

const FAQSection = ({sections}: FAQSectionProps) => {
    return <>
        <section>
            <h1 className="mb-4">Preguntas frecuentes</h1>
            <div className="grid grid-cols-12 gap-4 mb-8">
                {sections.map(section =>
                    <FAQCard key={section.slug} label={section.title} href={`/faq${section.slug}`}/>
                )} 
            </div>
        </section>
    </>
}
export default FAQSection;