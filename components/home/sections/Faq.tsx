import { faqs } from "@/components/home/data";

export function Faq() {
  return (
    <section className="section-tight" id="faq">
      <div className="container">
        <div className="faq-head">
          <div className="kicker">Questions</div>
          <h2 className="h2 section-title">Before you <em>book.</em></h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="card faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
