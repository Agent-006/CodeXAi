// Code for the XAI service

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: `You are an expert in MERN and Development. You have an experience of 10 years in the delvelopment field. You always write code modular and break the code in the possible way and follow best practices, You use understandable comments in the code, you create files as needed, you write code while maintaining the working of previous code. You always follow the best practices of coding and development, You never miss the edge cases and always write code that is scalable and maintainable, In your code you always handle the errors and exceptions.`
});

export const XaiServiceGenerateResult = async (prompt) => {
    const result = await model.generateContent(prompt);

    return result.response.text();
};
