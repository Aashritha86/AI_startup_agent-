import jsPDF from 'jspdf';
import { StartupProject } from '@/types/startup';

export async function generateStartupPdf(startup: StartupProject): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const d = startup.deliverables;

  // Helper to draw clean header & footer on any page
  const drawPageHeaderFooter = (pageNumber: number, totalPages: number, pageTitle: string) => {
    // Dark top header bar
    doc.setFillColor(15, 23, 42); // #0f172a
    doc.rect(0, 0, pageWidth, 18, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`AI STARTUP BUILDER  |  ${startup.title.toUpperCase()}`, margin, 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(pageTitle, pageWidth - margin, 11, { align: 'right' });

    // Footer
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Confidential - Generated for ${startup.title} on ${new Date().toLocaleDateString()}`, margin, pageHeight - 7);
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: COVER & EXECUTIVE SUMMARY
  // ==========================================
  // Hero Background Header
  doc.setFillColor(9, 13, 22);
  doc.rect(0, 0, pageWidth, 75, 'F');

  // Brand Name & Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text(startup.title, margin, 32);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(99, 102, 241); // indigo
  doc.text(startup.tagline || 'AI-Generated Full-Stack Startup Blueprint', margin, 42);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Industry: ${startup.industry || 'Technology'}   |   Target: ${startup.targetAudience || 'Modern Builders'}`, margin, 52);
  doc.text(`Date Generated: ${new Date().toLocaleDateString()}   |   Status: Production Foundation`, margin, 58);

  // Executive Overview Card
  let y = 88;
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE BLUEPRINT SUMMARY', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const splitDesc = doc.splitTextToSize(startup.description, contentWidth - 12);
  doc.text(splitDesc, margin + 6, y + 15);

  // Key KPI Cards Grid
  y = 130;
  const kpiWidth = (contentWidth - 6) / 3;

  // KPI 1: Value Prop
  doc.setFillColor(238, 242, 255); // indigo-50
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, y, kpiWidth, 40, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(79, 70, 229);
  doc.text('UNIQUE VALUE PROPOSITION', margin + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  const splitVp = doc.splitTextToSize(d?.businessModel?.valueProposition || 'High efficiency automation', kpiWidth - 8);
  doc.text(splitVp.slice(0, 5), margin + 4, y + 14);

  // KPI 2: Year 1 Cost
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(margin + kpiWidth + 3, y, kpiWidth, 40, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(5, 150, 105);
  doc.text('YEAR 1 EST. INVESTMENT', margin + kpiWidth + 7, y + 7);
  doc.setFontSize(14);
  doc.setTextColor(6, 95, 70);
  doc.text(`$${d?.costEstimation?.year1TotalEstimated?.toLocaleString() || '14,200'}`, margin + kpiWidth + 7, y + 18);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  doc.text(`Burn: $${d?.costEstimation?.monthlyBurnRate || '980'}/mo`, margin + kpiWidth + 7, y + 25);
  doc.text('Includes AWS + Supabase DB', margin + kpiWidth + 7, y + 31);

  // KPI 3: Scalability
  doc.setFillColor(254, 243, 199); // amber-50
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(margin + (kpiWidth + 3) * 2, y, kpiWidth, 40, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(217, 119, 6);
  doc.text('SCALABILITY RATING', margin + (kpiWidth + 3) * 2 + 5, y + 7);
  doc.setFontSize(11);
  doc.setTextColor(146, 64, 14);
  doc.text(d?.techStack?.scalabilityRating?.slice(0, 20) || 'Grade A+', margin + (kpiWidth + 3) * 2 + 5, y + 17);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  doc.text('Next.js 14 + Supabase RLS', margin + (kpiWidth + 3) * 2 + 5, y + 25);
  doc.text('Serverless Architecture', margin + (kpiWidth + 3) * 2 + 5, y + 31);

  // Deliverable Index Table
  y = 180;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('BLUEPRINT DELIVERABLES INCLUDED IN THIS REPORT', margin, y);

  y += 6;
  const deliverablesList = [
    '1. Business Model (Lean Canvas)',
    '2. Competitor Matrix & Unfair Advantage',
    '3. UI Wireframe & Design Specifications',
    '4. Full-Stack Technical Stack & Architecture',
    '5. Relational Database Schema & Supabase RLS',
    '6. Tiered Year 1 Cost Breakdown & Burn Rate',
    '7. Go-To-Market (GTM) Strategy & Day 1 Tactics',
    '8. Investor Pitch Deck (Slide-by-Slide)',
    '9. Landing Page Specifications & Waitlist Hook'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  deliverablesList.forEach((item, index) => {
    const col = index < 5 ? margin : margin + contentWidth / 2;
    const rowY = y + (index % 5) * 8;
    doc.text(`•  ${item}`, col + 4, rowY);
  });

  drawPageHeaderFooter(1, 4, 'Executive Overview');

  // ==========================================
  // PAGE 2: BUSINESS MODEL & COMPETITOR ANALYSIS
  // ==========================================
  doc.addPage();
  drawPageHeaderFooter(2, 4, 'Business Model & Competitors');

  y = 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Business Model (Lean Canvas)', margin, y);

  // 2-Column Clean Grid for Lean Canvas
  y += 6;
  const halfColWidth = (contentWidth - 4) / 2;

  // Box: Problems
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, y, halfColWidth, 42, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(185, 28, 28);
  doc.text('CORE PROBLEMS', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  d?.businessModel?.problem?.slice(0, 3).forEach((prob, i) => {
    const splitP = doc.splitTextToSize(`• ${prob}`, halfColWidth - 8);
    doc.text(splitP, margin + 4, y + 13 + i * 9);
  });

  // Box: Solutions
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(margin + halfColWidth + 4, y, halfColWidth, 42, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(5, 150, 105);
  doc.text('ENGINEERED SOLUTIONS', margin + halfColWidth + 8, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  d?.businessModel?.solution?.slice(0, 3).forEach((sol, i) => {
    const splitS = doc.splitTextToSize(`• ${sol}`, halfColWidth - 8);
    doc.text(splitS, margin + halfColWidth + 8, y + 13 + i * 9);
  });

  // Box: Revenue Streams & Cost Structure
  y += 46;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, halfColWidth, 38, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('REVENUE STREAMS', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  d?.businessModel?.revenueStreams?.slice(0, 3).forEach((rev, i) => {
    const splitR = doc.splitTextToSize(`• ${rev}`, halfColWidth - 8);
    doc.text(splitR, margin + 4, y + 13 + i * 8);
  });

  // Box: Unfair Advantage & Moats
  doc.setFillColor(245, 243, 255);
  doc.setDrawColor(221, 214, 254);
  doc.roundedRect(margin + halfColWidth + 4, y, halfColWidth, 38, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(109, 40, 217);
  doc.text('UNFAIR ADVANTAGE & DEFENSIVE MOATS', margin + halfColWidth + 8, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const splitAdv = doc.splitTextToSize(d?.businessModel?.unfairAdvantage || 'Proprietary domain workflows & RLS', halfColWidth - 8);
  doc.text(splitAdv, margin + halfColWidth + 8, y + 14);

  // Section 2: Competitor Matrix
  y += 44;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Competitor Matrix & White Space Analysis', margin, y);

  y += 6;
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('COMPETITOR', margin + 4, y + 5);
  doc.text('EST. SHARE', margin + 45, y + 5);
  doc.text('PRICING MODEL', margin + 75, y + 5);
  doc.text('KEY VULNERABILITY (YOUR OPPORTUNITY)', margin + 115, y + 5);

  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  d?.competitorAnalysis?.competitors?.slice(0, 3).forEach((comp, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 16, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(comp.name, margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(79, 70, 229);
    doc.text(comp.marketShare, margin + 45, y + 6);

    doc.setTextColor(71, 85, 105);
    doc.text(comp.pricingModel.slice(0, 22), margin + 75, y + 6);

    doc.setTextColor(185, 28, 28);
    const splitVuln = doc.splitTextToSize(comp.vulnerability, contentWidth - 118);
    doc.text(splitVuln.slice(0, 2), margin + 115, y + 6);

    y += 16;
  });

  // Unfair advantage banner
  y += 3;
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(79, 70, 229);
  doc.text('YOUR UNFAIR ADVANTAGE:', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text(doc.splitTextToSize(d?.competitorAnalysis?.userUnfairAdvantage || '', contentWidth - 8), margin + 4, y + 11);

  // ==========================================
  // PAGE 3: TECH STACK & DATABASE SCHEMA
  // ==========================================
  doc.addPage();
  drawPageHeaderFooter(3, 4, 'Tech Stack & Database Schema');

  y = 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Technical Stack & Architecture Recommendations', margin, y);

  y += 6;
  const techCategories = [
    { cat: 'Frontend', items: d?.techStack?.frontend },
    { cat: 'Backend & API', items: d?.techStack?.backend },
    { cat: 'Database & Auth', items: d?.techStack?.database },
    { cat: 'Cloud Infrastructure', items: d?.techStack?.infrastructure },
    { cat: 'AI Integration', items: d?.techStack?.aiIntegration },
  ];

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 48, 2, 2, 'FD');

  let techY = y + 7;
  techCategories.forEach((tc) => {
    const firstTool = tc.items?.[0];
    if (firstTool) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(`${tc.cat}:`, margin + 5, techY);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(firstTool.tool, margin + 42, techY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      const splitJ = doc.splitTextToSize(firstTool.justification, contentWidth - 85);
      doc.text(splitJ.slice(0, 1), margin + 80, techY);

      techY += 8;
    }
  });

  // Section 4: Database Schema (Relational PostgreSQL & RLS)
  y += 56;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Database Relational Schema (PostgreSQL with Supabase RLS)', margin, y);

  y += 6;
  d?.databaseSchema?.tables?.slice(0, 3).forEach((table) => {
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`TABLE: ${table.tableName.toUpperCase()}`, margin + 5, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Description: ${table.description}`, margin + 5, y + 11);

    // Columns preview
    const colsPreview = table.columns?.map(c => `${c.name} (${c.type})`).join('  •  ');
    doc.setTextColor(79, 70, 229);
    doc.setFont('helvetica', 'bold');
    doc.text(`Columns: ${colsPreview}`, margin + 5, y + 18);

    y += 27;
  });

  // Section 5: Cost Estimation Tiers
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('5. Year 1 Tiered Operating Cost Estimation', margin, y);

  y += 6;
  const costTierW = (contentWidth - 6) / 3;
  d?.costEstimation?.tiers?.forEach((tier, i) => {
    doc.setFillColor(i === 1 ? 238 : 248, i === 1 ? 242 : 250, i === 1 ? 255 : 252);
    doc.setDrawColor(i === 1 ? 99 : 226, i === 1 ? 102 : 232, i === 1 ? 241 : 240);
    doc.roundedRect(margin + i * (costTierW + 3), y, costTierW, 26, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(i === 1 ? 79 : 15, i === 1 ? 70 : 23, i === 1 ? 229 : 42);
    doc.text(tier.tierName.toUpperCase(), margin + i * (costTierW + 3) + 4, y + 6);

    doc.setFontSize(12);
    doc.setTextColor(5, 150, 105);
    doc.text(`$${tier.monthlyCost}/mo`, margin + i * (costTierW + 3) + 4, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Annual: $${tier.annualCost.toLocaleString()}`, margin + i * (costTierW + 3) + 4, y + 20);
  });

  // ==========================================
  // PAGE 4: GTM MARKETING & PITCH DECK SLIDES
  // ==========================================
  doc.addPage();
  drawPageHeaderFooter(4, 4, 'GTM Strategy & Pitch Deck');

  y = 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('6. Go-To-Market Strategy & Day 1 Launch Blitz', margin, y);

  y += 6;
  doc.setFillColor(255, 241, 242);
  doc.setDrawColor(254, 205, 211);
  doc.roundedRect(margin, y, contentWidth, 36, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(225, 29, 72);
  doc.text('DAY 1 LAUNCH TACTICS', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  d?.marketingPlan?.day1LaunchTactics?.slice(0, 3).forEach((tac, i) => {
    doc.text(`✓  ${tac}`, margin + 5, y + 14 + i * 7);
  });

  // Acquisition Channels
  y += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('7. Acquisition Channels & Conversion Benchmarks', margin, y);

  y += 6;
  d?.marketingPlan?.channels?.slice(0, 3).forEach((ch) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(ch.channelName, margin + 4, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 150, 105);
    doc.text(`Est. CAC: ${ch.cacEstimate}`, margin + 65, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(ch.strategy.slice(0, 65), margin + 105, y + 6);

    y += 16;
  });

  // Pitch Deck Summary
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('8. Investor Pitch Deck Highlights', margin, y);

  y += 6;
  const slideW = (contentWidth - 6) / 2;
  d?.pitchDeck?.slides?.slice(0, 4).forEach((slide, idx) => {
    const colX = margin + (idx % 2) * (slideW + 6);
    const rowY = y + Math.floor(idx / 2) * 28;

    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(colX, rowY, slideW, 25, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(79, 70, 229);
    doc.text(`SLIDE 0${slide.slideNumber}: ${slide.title.toUpperCase()}`, colX + 4, rowY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    const splitH = doc.splitTextToSize(slide.headline, slideW - 8);
    doc.text(splitH.slice(0, 1), colX + 4, rowY + 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(slide.content?.[0]?.slice(0, 45) || '', colX + 4, rowY + 17);
  });

  // Save the multi-page PDF document
  const fileName = `${startup.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-blueprint.pdf`;
  doc.save(fileName);
}
