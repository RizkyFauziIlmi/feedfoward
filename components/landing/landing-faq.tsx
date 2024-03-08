import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const LandingFaq = () => {
  return (
    <section
      className="md:h-screen w-screen px-12 md:px-24 pt-10 pb-4 flex flex-col items-center"
      id="faq"
    >
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight mb-3 text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        In this FAQ section you can find all the information about our services
      </p>
      <div className="max-w-xl te pb-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does the donation process work?
            </AccordionTrigger>
            <AccordionContent>
              To donate food, simply sign up for an account on our platform and
              select the option to donate. You'll be guided through the process
              of listing your surplus food items and choosing a nearby
              organization or charity to donate to. Once confirmed, arrange for
              drop-off or pickup based on the recipient's preferences.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What types of food can I donate?
            </AccordionTrigger>
            <AccordionContent>
              You can donate non-perishable and perishable food items, including
              canned goods, fresh produce, packaged foods, and baked goods.
              Please ensure that perishable items are within their expiration
              dates and stored properly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do you ensure the safety of donated food?
            </AccordionTrigger>
            <AccordionContent>
              We prioritize food safety and require donors to adhere to food
              safety guidelines and regulations. Additionally, we encourage
              communication between donors and recipients to ensure proper
              handling and storage of donated food items.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I donate leftover food from events or restaurants?
            </AccordionTrigger>
            <AccordionContent>
              Yes, leftover food from events or restaurants can be donated as
              long as it meets our donation guidelines and food safety
              standards. Please ensure that the food is still safe for
              consumption and properly packaged for donation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              How can I track the impact of my donations?
            </AccordionTrigger>
            <AccordionContent className="text-start">
              Your user dashboard provides detailed information on the impact of
              your donations, including the number of meals provided, food waste
              reduced, and the organizations supported. We strive to provide
              transparent reporting to showcase the positive difference your
              donations make in the community.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              Are there any costs associated with donating food?
            </AccordionTrigger>
            <AccordionContent className="text-start">
              No, there are no costs involved in donating food through our
              platform. We strive to facilitate seamless and free-of-charge food
              donations to support communities in need.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              Is there a minimum or maximum amount of food I can donate?
            </AccordionTrigger>
            <AccordionContent className="text-start">
              There is no strict minimum or maximum limit on the amount of food
              you can donate. Whether you have a small surplus or a large
              quantity of food, every contribution makes a meaningful impact.
              Donate what you can, and together, we can make a difference in
              fighting food insecurity.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              How can I contact support if I have further questions?
            </AccordionTrigger>
            <AccordionContent className="text-start">
              If you have any additional questions or need further assistance,
              please reach out to our customer support team through the contact
              form on our website. We're here to help and ensure your donation
              experience is seamless and rewarding.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
