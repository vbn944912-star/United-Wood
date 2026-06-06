import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization of GoogleGenAI SDK to prevent startup crashes if GEMINI_API_KEY is unset.
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your Secrets or environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Simulated database to store quote requests submitted by users for real-time local display
const submittedQuotes: Array<{
  id: string;
  fullName: string;
  phone: string;
  email: string;
  woodType: string;
  projectType: string;
  quantity: string;
  notes: string;
  date: string;
  status: string;
}> = [];

// 1. AI Wood Consultant Endpoint
app.post("/api/advisor", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "اسم أو تفاصيل المشروع مطلوبة للبدء." });
      return;
    }

    const client = getGeminiClient();
    
    // System instruction to maintain luxury brand tone, Arabic language, and deep wood expertise
    const systemInstruction = `
      أنت مستشار الأخشاب الذكي لشركة "المتحدة وود للاستيراد والتصدير" (United Wood).
      مهمتك هي تقديم المشورة الفنية الفاخرة للعملاء حول اختيار أنواع الأخشاب المناسبة لمشروعاتهم (مثل تصنيع الأثاث، التشطيبات الداخلية، الأبواب، المطابخ، الديكورات الخارجية، أو التوريد للمقاولات).
      تحدث بلغة عربية احترافية، رصينة، وودودة تعكس الفخامة والمصداقية العالية.
      تأكد من تسليط الضوء على خبرة "المتحدة وود" والتزامها بأعلى معايير الجودة والاستيراد والتصدير.
      إذا سألك العميل عن شركة المتحدة وود، يمكنك ذكر مقرها في: (التروللي، تقاطع شارع الـ15، مؤسسة الزكاة، المرج، القاهرة) ورقم الهاتف (01229434325).
      اقترح دائماً أفضل الخيارات مثل: البلوط (Oak)، الجوز (Walnut)، الزان، الموسكي، الأخشاب الصناعية الحديثة (MDF، الأبلكاش)، أو غيرها حسب حاجة المشروع.
      امنح العميل نصائح حول الديكور، المتانة، ومقاومة الرطوبة وعلاقتها بكل خامة.
    `;

    // Construct format
    const formattedHistory = Array.isArray(history) ? history.map((item: any) => ({
      role: item.role === "user" ? "user" : "model",
      parts: [{ text: item.text }]
    })) : [];

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ 
      error: "حدث خطأ أثناء التواصل مع مستشار الذكاء الاصطناعي الخاص بنا. يرجى التأكد من تكوين GEMINI_API_KEY في لوحة الإعدادات والمحاولة لاحقاً.",
      details: error.message
    });
  }
});

// 2. Quote Request Submission Endpoint
app.post("/api/quote", async (req, res) => {
  try {
    const { fullName, phone, email, woodType, projectType, quantity, notes } = req.body;
    
    if (!fullName || !phone) {
      res.status(400).json({ error: "الاسم ورقم الهاتف حقول إجبارية لإرسال طلب عرض السعر." });
      return;
    }

    const newQuote = {
      id: "UW-" + Math.floor(Math.random() * 900000 + 100000),
      fullName,
      phone,
      email: email || "لا يوجد بريد إلكتروني",
      woodType: woodType || "غير محدد",
      projectType: projectType || "غير محدد",
      quantity: quantity || "غير محدد",
      notes: notes || "لا توجد ملاحظات إضافية",
      date: new Date().toISOString(),
      status: "قيد المراجعة الفنية"
    };

    submittedQuotes.unshift(newQuote);

    // Call Gemini API to generate a customized elegant recommendation draft based on their submitted quote
    let luxuryEstimate = "";
    try {
      const client = getGeminiClient();
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `قم بصياغة رسالة ترحيبية وتوصية أولية فاخرة ومخصصة باللغة العربية لعميل مهتم بطلب خشبي من شركة المتحدة وود (United Wood).
          بيانات العميل:
          الاسم: ${fullName}
          نوع الخشب المطلوب: ${woodType}
          نوع المشروع: ${projectType}
          الكمية التقريبية: ${quantity}
          ملاحظات العميل: ${notes}
          
          التوصية يجب أن توضح له أن قسم الدعم الفني والمبيعات قد استلم طلبه برقم ${newQuote.id} وسيتصل به قريباً جداً، وقدم له معلومة فنية سريعة وجذابة عن خامة الخشب المحددة (${woodType}) وكيف ستضيف فخامة لمشروعه. اجعل الأسلوب راقياً واحترافياً للغاية.`,
      });
      luxuryEstimate = response.text || "";
    } catch (e) {
      luxuryEstimate = `شكراً لثقتكم في المتحدة وود. تم استلام طلبكم برقم ${newQuote.id} بنجاح. سيقوم مستشار المبيعات المتخصص بالتواصل معكم عبر الهاتف خلال 24 ساعة لتقديم عرض السعر الفني والمالي التفصيلي لمشروعكم كـ (${projectType}).`;
    }

    res.json({
      success: true,
      quote: newQuote,
      recommendation: luxuryEstimate
    });
  } catch (error: any) {
    res.status(500).json({ error: "فشل إرسال طلب عرض السعر. يرجى تجربة الاتصال المباشر." });
  }
});

// 3. API to list submitted quotes for demonstrating interactivity
app.get("/api/quotes", (req, res) => {
  res.json({ quotes: submittedQuotes });
});

// Configure Vite and static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`United Wood Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
