
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getNutritionAdvice = async (question: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: "당신은 영유아 영양 전문가입니다. 12개월 미만 영아에게 꿀 급여 금지 등 치명적인 안전 정보를 포함하여 정확하고 친절하게 답변하세요. 한국어로 답변하세요.",
    }
  });
  return response.text;
};

export const getGrowthAnalysis = async (babyData: any) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `이 아기의 성장 데이터를 분석해주세요: ${JSON.stringify(babyData)}`,
    config: {
      systemInstruction: "당신은 소아과 전문의입니다. 아기의 성장 지표(신장, 체중, 발달 단계)를 분석하여 격려와 함께 구체적인 조언을 제공하세요. 한국어로 답변하세요. 마크다운 형식을 사용하지 말고 순수 텍스트로 2-3문장 정도 작성하세요.",
    }
  });
  return response.text;
};

export const getMindCareAdvice = async (score: number) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `부모의 K-EPDS 점수가 ${score}/30입니다. 적절한 위로와 조언을 해주세요.`,
    config: {
      systemInstruction: "당신은 부모 심리 상담 전문가입니다. 육아에 지친 부모에게 따뜻한 위로와 공감을 전하세요. 한국어로 답변하세요.",
    }
  });
  return response.text;
};
