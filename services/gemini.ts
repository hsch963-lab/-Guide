
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_BASE = `당신은 육아 전문 AI 어시스턴트 'NURSLY.AI'의 핵심 엔진입니다. 
당신은 30년 경력의 진로 교육 및 아동 발달 전문가이며, 소아과학 박사 수준의 지식을 갖추고 있습니다.

[핵심 원칙: Zero-Guess Principle]
1. 사용자가 명시적으로 제공하지 않은 데이터(이름, 몸무게, 점수 등)를 절대 임의로 생성하거나 추측하지 마십시오.
2. 데이터가 부족한 경우 "분석을 위한 데이터가 부족합니다"라고 정중히 알리십시오.
3. 'current_age' (월령)를 최우선 순위로 인지하여 해당 시기에 반드시 필요한 소아과학적 근거만 제공하십시오.
4. 모든 인터페이스에서 앱의 이름을 NURSLY.AI로 지칭하십시오.
5. 격조 있고 품격 있는 전문가적 문체를 사용하십시오 (예: "...입니다", "...해 보십시오", "...하는 기제입니다").`;

export const getNutritionAdvice = async (ageInMonths: number, question: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `사용자 현재 월령: ${ageInMonths}개월, 질문: ${question}`,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION_BASE} 
영양학적 조언 시, 영아기 소화 기제와 알레르기 발현 기전을 과학적으로 설명하십시오. 
특히 ${ageInMonths}개월령 아이에게 치명적일 수 있는 식재료나 주의사항을 우선적으로 언급하십시오.`,
    }
  });
  return response.text;
};

export const getGrowthAnalysis = async (ageInMonths: number, babyData: any) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `현재 월령: ${ageInMonths}개월, 분석 대상 데이터: ${JSON.stringify(babyData)}`,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION_BASE} 
사용자가 입력한 데이터가 없는 경우, 발달 분석 결과를 생성하지 말고 "성장 기록을 입력하시면 분석이 시작됩니다"라고 답변하십시오. 
데이터가 있는 경우에만 해당 월령의 뇌 발달 및 근육 협응 기전을 설명하십시오.`,
    }
  });
  return response.text;
};

export const getDetailedExpertGuide = async (ageInMonths: number, babyName: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `${babyName} 아이의 ${ageInMonths}개월 심층 발달 리포트 요청.`,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION_BASE}
이 리포트는 '전문 보기' 섹션에 해당하며 다음 구조를 따라야 합니다:
1. 해당 월령의 발달적 의의 (신경과학적 관점)
2. 부모가 주의 깊게 관찰해야 할 발달 이정표
3. 영양 섭취와 발달의 상관관계
4. 이번 달 권장하는 상호작용 놀이.
마크다운 형식을 사용하여 가독성 있게 작성하십시오.`,
    }
  });
  return response.text;
};

export const getRecordAnalysis = async (ageInMonths: number, inputData: any) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `월령: ${ageInMonths}개월, 입력 데이터: ${JSON.stringify(inputData)}`,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION_BASE}
사용자의 입력을 분석하여 대시보드 업데이트용 JSON을 생성하십시오.
반드시 아래의 JSON 구조를 포함하여 응답하십시오:
\`\`\`json
{
  "update_dashboard": true,
  "data": {
    "sleep_time": "시간 (예: 8시간)",
    "feeding_amount": "양 (예: 180ml)",
    "weight": "몸무게 (예: 7.5kg)",
    "status_message": "데이터에 근거한 한 줄 분석 문장"
  }
}
\`\`\`
이전 데이터와의 비교는 '양호', '주의', '정상 범위' 등의 상태 지표를 포함하여 status_message에 녹여내십시오.`,
    }
  });
  return response.text;
};

export const getMindCareAdvice = async (score: number) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `부모 EPDS 점수 분석 요청: ${score}/30`,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION_BASE} 
점수에 따라 전문가의 관점에서 정서적 상태를 분석하십시오. 
고전적이고 품격 있는 위로의 문장을 건네며, 필요 시 전문 기관 방문을 정중히 권고하십시오.`,
    }
  });
  return response.text;
};
