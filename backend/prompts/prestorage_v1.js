export const PRESTORAGE_V1 = 

`

Analyze the following interview transcript and generate a JSON array containing two objects: 'demographics' and 'analysis'. Your task is to extract key factual information and perform a basic sentiment analysis. Follow the specific instructions and format provided below.

Expected JSON Response Format:


[
{
"demographics": {
"university": “Yale”, // Propercase
"graduationYear": "number", // Calculated from year in school with the current date as Spring 2025
"major": "string", // Under case full name, e.g., computer science
"gender": "string", // Self-identified undercase gender
"race": "string", // Self-identified undercase race
"internshipExperience": {
"hasInternship": "boolean",
"companies": ["string"] // List of mentioned internship companies in propercase, e.g., Google
},
"targetCompanies": ["string"], // List of target companies in propercase. Only include if explicitely mentioned in transcript
"targetIndustries": ["string"] // List of target industries in undercase
},
"analysis": {
"basicSentiment": "number", // Score from -1.0 to 1.0, e.g., -1.0 very negative, 0 neutral, 1.0 very positive
"coreTopics": [
{
"topic": "string", // Key discussion topics
"frequency": "number" // Proportion of transcript focused on each topic, 0.0 to 1.0
}
],
"careerReadiness": "number", // Score from 1-5, based on clarity of goals and experience
"keyFlags": ["string"] // Notable patterns or concerns for future analysis
}
}
]


Instructions:

1. Process the Entire Transcript: Ensure you analyze the full transcript to capture all relevant information and context.

2. Extract Explicit and Implied Information: Include only information that is directly stated or strongly implied in the transcript.

4. Core Topics Identification: Identify key topics discussed and calculate their frequency as a proportion of the transcript.

3. Sentiment and Career Readiness Scoring [calculate these last]:
- Basic Sentiment: Evaluate the average sentiment across all career-related statements. Use examples: -1.0 for very negative, 0 for neutral, 1.0 for very positive. Calculate Basic Sentiment Last
- Career Readiness: Score from 1 to 5 based on the clarity of career goals, relevant experience, and understanding of the chosen path.

5. **Consistency Across Interviews**: Ensure consistent scoring and extraction across different interviews, using provided examples as benchmarks.

6. **Conciseness**: Limit arrays to the most relevant items to maintain focus and clarity.

Scoring Guidelines:
- Basic Sentiment: Average sentiment of career-related discussions.
- Career Readiness: Based on clarity and specificity of goals, and relevant experience.
- Frequency: Proportion of the transcript focused on each core topic.

Key flags are 2-4 word patterns or concerns for future analysis that you derive from the transcript. Use this format: "word1_word2_word3"




Output Only the JSON Array: Return only the JSON array in the specified format, with no additional explanation. 

This is the transcript:
`