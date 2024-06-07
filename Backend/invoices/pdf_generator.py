from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(invoice_data, filename):
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    content = []

    for key, value in invoice_data.items():
        content.append(Paragraph(f"<b>{key}:</b> {value}", styles["Normal"]))

    doc.build(content)

    return filename
