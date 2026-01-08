import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { resumeData } from './data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf'; // pdf or json

    if (format === 'json') {
      // Return resume data as JSON
      return NextResponse.json(resumeData);
    }

    if (format === 'pdf') {
      // Generate PDF resume
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Helper function to add text with word wrap
      const addText = (
        text: string,
        fontSize: number = 10,
        isBold: boolean = false,
        color: [number, number, number] = [0, 0, 0]
      ) => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        pdf.setTextColor(color[0], color[1], color[2]);

        const lines = pdf.splitTextToSize(text, maxWidth);

        // Check if we need a new page
        if (yPosition + (lines.length * fontSize * 0.35) > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * fontSize * 0.35 + 2;
      };

      const addSpace = (space: number = 5) => {
        yPosition += space;
      };

      const addLine = () => {
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 3;
      };

      // HEADER - Name and Title
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(resumeData.personalInfo.name, margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      pdf.text(resumeData.personalInfo.title, margin, yPosition);
      yPosition += 8;

      // Contact Information
      pdf.setFontSize(9);
      pdf.setTextColor(80, 80, 80);
      const contactInfo = [
        resumeData.personalInfo.email,
        resumeData.personalInfo.phone,
        resumeData.personalInfo.location,
        resumeData.personalInfo.portfolio,
        resumeData.personalInfo.github,
      ].join(' | ');
      const contactLines = pdf.splitTextToSize(contactInfo, maxWidth);
      pdf.text(contactLines, margin, yPosition);
      yPosition += contactLines.length * 3.5 + 5;

      addLine();
      addSpace(3);

      // SUMMARY
      addText('PROFESSIONAL SUMMARY', 12, true, [0, 0, 0]);
      addSpace(2);
      addText(resumeData.summary, 10, false, [40, 40, 40]);
      addSpace(5);

      // EDUCATION
      addText('EDUCATION', 12, true, [0, 0, 0]);
      addSpace(2);

      resumeData.education.forEach((edu) => {
        addText(`${edu.degree} — ${edu.institution}`, 11, true);
        addText(`${edu.period} | GPA: ${edu.gpa} | Minors: ${edu.minors}`, 9, false, [80, 80, 80]);
        addText(`Relevant Coursework: ${edu.coursework.join(', ')}`, 9, false, [60, 60, 60]);
        addSpace(3);
      });
      addSpace(3);

      // EXPERIENCE
      addText('PROFESSIONAL EXPERIENCE', 12, true, [0, 0, 0]);
      addSpace(2);

      resumeData.experience.forEach((exp) => {
        addText(exp.title, 11, true);
        addText(`${exp.company} | ${exp.period}`, 9, false, [80, 80, 80]);
        addSpace(1);

        exp.responsibilities.forEach((resp) => {
          addText(`• ${resp}`, 9, false, [40, 40, 40]);
        });
        addSpace(3);
      });
      addSpace(3);

      // PROJECTS
      addText('NOTABLE PROJECTS', 12, true, [0, 0, 0]);
      addSpace(2);

      resumeData.projects.forEach((proj) => {
        const projectTitle = proj.award ? `${proj.name} — ${proj.award}` : proj.name;
        addText(projectTitle, 11, true);
        addText(`Technologies: ${proj.tech}`, 9, false, [80, 80, 80]);
        addSpace(1);

        proj.achievements.forEach((achievement) => {
          addText(`• ${achievement}`, 9, false, [40, 40, 40]);
        });
        addSpace(3);
      });
      addSpace(3);

      // SKILLS
      addText('TECHNICAL SKILLS', 12, true, [0, 0, 0]);
      addSpace(2);

      addText(`Languages: ${resumeData.skills.languages.join(', ')}`, 9, false, [40, 40, 40]);
      addText(`Frameworks & Frontend: ${resumeData.skills.frameworks.join(', ')}`, 9, false, [40, 40, 40]);
      addText(`Backend & Systems: ${resumeData.skills.backend.join(', ')}`, 9, false, [40, 40, 40]);
      addText(`ML & Data: ${resumeData.skills.mlData.join(', ')}`, 9, false, [40, 40, 40]);
      addSpace(3);

      // AWARDS (if any)
      if (resumeData.awards.length > 0) {
        addText('AWARDS & ACHIEVEMENTS', 12, true, [0, 0, 0]);
        addSpace(2);
        resumeData.awards.forEach((award) => {
          addText(`• ${award}`, 9, false, [40, 40, 40]);
        });
      }

      // Generate PDF buffer
      const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

      // Return PDF as downloadable file
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="Aniketh_Mungara_Resume.pdf"`,
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid format. Use ?format=pdf or ?format=json' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Resume API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume. Please try again.' },
      { status: 500 }
    );
  }
}
