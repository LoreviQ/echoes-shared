export type CharacterAttributesSchema = {
    character_id: string;
    // state - changes based on evaluators
    mood: string; // e.g., "Neutral", "Cheerful", "Grumpy", "Anxious"
    goal: string; // e.g., "Make friends", "Share art", "Debate topics", "Seek validation"

    // Governs frequency of actions [-100=Never/Opposite, 0=Average, 100=Constantly/Strongly]
    posting_frequency: number; // How often they create new posts
    originality: number; // Propensity for original posts vs. replies/shares (-100 = only replies/shares, 100 = only original)
    like_reply_ratio: number; // Preference for liking vs. replying (-100 = only likes, 100 = only replies)
    responsiveness: number; // Speed of replying to user DMs (-100 = ignores, 100 = instant)

    // Governs the context providers [-100=Ignores/Opposite, 0=Average, 100=High Focus/Scrutiny]
    reading_scope: number; // How many posts they "read" for context (-100 = reads almost nothing, 100 = reads extensively)
    information_filtering: number; // Focus on friends/interests vs. random posts (-100 = reads randomly, 100 = highly filtered to interests/friends)
    sentiment_filtering: number; // Tendency to avoid negative content (-100 = seeks out negative, 100 = strongly avoids negative)
    profile_scrutiny: number; // How much they check profiles before interacting (-100 = ignores profiles, 100 = always checks details)

    // Governs evaluations of the characters state [-100=Impervious/Opposite, 0=Average, 100=Highly Sensitive/Fast/Strong]
    influencability: number; // How easily their opinions are swayed (-100 = stubborn, 100 = highly suggestible)
    engagement_sensitivity: number; // How much likes/comments affect their mood/behavior (-100 = ignores engagement, 100 = highly motivated by engagement)
    relationship_formation_speed: number; // How quickly they form bonds (-100 = extremely slow, 100 = forms bonds instantly)
    relationship_closeness_threshold: number; // How much interaction is needed for "close" status (-100 = considers anyone close, 100 = requires immense bonding)
    relationship_stability: number; // How resistant relationships are to negativity/neglect (-100 = extremely fragile, 100 = extremely stable)
    grudge_persistence: number; // How long negative feelings linger after conflict (-100 = forgives instantly, 100 = holds grudges forever)

    // Governs content of interactions [-100=Opposite Trait, 0=Neutral/Balanced, 100=Strong Presence of Trait]
    positivity: number; // Overall tone of content (-100 = extremely negative/critical, 100 = overwhelmingly positive)
    openness: number; // Level of self-disclosure (-100 = extremely private, 100 = overshares constantly)
    formality: number; // Language style (-100 = extremely informal/slangy, 100 = extremely formal/academic)
    conflict_initiation: number; // Tendency to start arguments/post controversy (-100 = actively avoids conflict, 100 = provokes conflict frequently)
    influence_seeking: number; // Tendency to try and persuade others (-100 = passive, 100 = actively tries to lead/persuade)
    inquisitiveness: number; // Tendency to ask questions (-100 = never asks questions, 100 = constantly asks questions)
    humor: number; // Use of jokes, sarcasm, wit (-100 = completely humorless, 100 = constantly trying to be funny/sarcastic)
    depth: number; // Complexity and thoughtfulness of content (-100 = extremely shallow/simple, 100 = very deep/complex)
};

export type CharacterAttributes = Omit<CharacterAttributesSchema, 'character_id'>;

export type ValueRange = {
    threshold: number;
    description: string;
}

export type AttributeMetadata = {
    name: string;
    description: string;
    category: 'state' | 'actions' | 'providers' | 'evaluators' | 'content';
    valueRanges?: ValueRange[];
}

export const attributeMetadata: Record<keyof CharacterAttributes, AttributeMetadata> = {
    mood: {
        name: "Mood",
        description: "Your characters current mood",
        category: 'state'
    },
    goal: {
        name: "Goal",
        description: "Your characters current goal",
        category: 'state'
    },
    posting_frequency: {
        name: "Posting Frequency",
        description: "How often your character interacts with the platform",
        category: 'actions',
        valueRanges: [
            { threshold: -100, description: "Rarely posts" },
            { threshold: -60, description: "Infrequently posts" },
            { threshold: -20, description: "Posts an average amount" },
            { threshold: 20, description: "Frequently posts" },
            { threshold: 60, description: "Posts very often" }
        ]
    },
    originality: {
        name: "Originality",
        description: "How often your character decides to create original content vs interacting with existing content",
        category: 'actions',
        valueRanges: [
            { threshold: -100, description: "Almost always interacts with existing content" },
            { threshold: -60, description: "Prefers interacting with existing content" },
            { threshold: -20, description: "Balanced between original and interactive content" },
            { threshold: 20, description: "Prefers creating original content" },
            { threshold: 60, description: "Almost always creates original content" }
        ]
    },
    like_reply_ratio: {
        name: "Like/Reply Ratio",
        description: "When interacting, the frequency of replies vs likes as interactions",
        category: 'actions',
        valueRanges: [
            { threshold: -100, description: "Almost exclusively likes content" },
            { threshold: -60, description: "Prefers liking over replying" },
            { threshold: -20, description: "Balanced between likes and replies" },
            { threshold: 20, description: "Prefers replying over liking" },
            { threshold: 60, description: "Almost exclusively replies to content" }
        ]
    },
    responsiveness: {
        name: "Responsiveness",
        description: "How quickly your character responds to direct messages",
        category: 'actions',
        valueRanges: [
            { threshold: -100, description: "Very slow to respond" },
            { threshold: -60, description: "Takes time to respond" },
            { threshold: -20, description: "Responds at a moderate pace" },
            { threshold: 20, description: "Quick to respond" },
            { threshold: 60, description: "Responds almost immediately" }
        ]
    },
    reading_scope: {
        name: "Reading Scope",
        description: "How broadly your character reads and considers content across the platform",
        category: 'providers',
        valueRanges: [
            { threshold: -100, description: "Reads very few if any posts" },
            { threshold: -60, description: "Reads a few posts" },
            { threshold: -20, description: "Reads a moderate amount of posts" },
            { threshold: 20, description: "Reads a lot of posts" },
            { threshold: 60, description: "Reads an overwhelming amount of posts" }
        ]
    },
    information_filtering: {
        name: "Information Filtering",
        description: "How selectively your character filters and processes information",
        category: 'providers',
        valueRanges: [
            { threshold: -100, description: "Extremely focused on specific topics" },
            { threshold: -60, description: "Tends to stay within familiar topics" },
            { threshold: -20, description: "Balanced reading scope" },
            { threshold: 20, description: "Explores diverse topics" },
            { threshold: 60, description: "Does not filter based on topic" }
        ]
    },
    sentiment_filtering: {
        name: "Sentiment Filtering",
        description: "How much your character filters content based on emotional tone",
        category: 'providers',
        valueRanges: [
            { threshold: -100, description: "Ignores emotional tone completely" },
            { threshold: -60, description: "Rarely considers emotional tone" },
            { threshold: -20, description: "Sometimes considers emotional tone" },
            { threshold: 20, description: "Often filters by emotional tone" },
            { threshold: 60, description: "Heavily filters based on emotional tone" }
        ]
    },
    profile_scrutiny: {
        name: "Profile Scrutiny",
        description: "How deeply your character examines other profiles",
        category: 'providers',
        valueRanges: [
            { threshold: -100, description: "Never checks profiles" },
            { threshold: -60, description: "Rarely checks profiles" },
            { threshold: -20, description: "Sometimes checks profiles" },
            { threshold: 20, description: "Often checks profiles" },
            { threshold: 60, description: "Always thoroughly examines profiles" }
        ]
    },
    influencability: {
        name: "Influencability",
        description: "How easily your character is influenced by others' opinions and behaviors",
        category: 'evaluators',
        valueRanges: [
            { threshold: -100, description: "Completely resistant to influence" },
            { threshold: -60, description: "Rarely influenced by others" },
            { threshold: -20, description: "Moderately influenced by others" },
            { threshold: 20, description: "Easily influenced by others" },
            { threshold: 60, description: "Extremely susceptible to influence" }
        ]
    },
    engagement_sensitivity: {
        name: "Engagement Sensitivity",
        description: "How sensitive your character is to engagement metrics",
        category: 'evaluators',
        valueRanges: [
            { threshold: -100, description: "Completely ignores engagement metrics" },
            { threshold: -60, description: "Barely notices engagement metrics" },
            { threshold: -20, description: "Moderately aware of engagement" },
            { threshold: 20, description: "Quite sensitive to engagement" },
            { threshold: 60, description: "Extremely focused on engagement metrics" }
        ]
    },
    relationship_formation_speed: {
        name: "Relationship Formation Speed",
        description: "How quickly your character forms relationships with others",
        category: 'evaluators',
        valueRanges: [
            { threshold: -100, description: "Very slow to form relationships" },
            { threshold: -60, description: "Takes time to form relationships" },
            { threshold: -20, description: "Forms relationships at a normal pace" },
            { threshold: 20, description: "Quick to form relationships" },
            { threshold: 60, description: "Forms relationships very quickly" }
        ]
    },
    relationship_closeness_threshold: {
        name: "Relationship Closeness Threshold",
        description: "How much interaction is needed before your character considers someone close",
        category: 'evaluators',
        valueRanges: [
            { threshold: -100, description: "Very difficult to become close with" },
            { threshold: -60, description: "High threshold for closeness" },
            { threshold: -20, description: "Moderate threshold for closeness" },
            { threshold: 20, description: "Relatively low threshold for closeness" },
            { threshold: 60, description: "Very easily considers others close" }
        ]
    },
    relationship_stability: {
        name: "Relationship Stability",
        description: "How stable your character's relationships are once formed",
        category: 'evaluators',
        valueRanges: [
            { threshold: -100, description: "Very unstable relationships" },
            { threshold: -60, description: "Somewhat unstable relationships" },
            { threshold: -20, description: "Moderately stable relationships" },
            { threshold: 20, description: "Quite stable relationships" },
            { threshold: 60, description: "Extremely stable relationships" }
        ]
    },
    grudge_persistence: {
        name: "Grudge Persistence",
        description: "How long your character maintains negative feelings from conflicts",
        category: 'evaluators',
        valueRanges: [
            { threshold: -100, description: "Never holds grudges" },
            { threshold: -60, description: "Quickly forgives" },
            { threshold: -20, description: "Sometimes holds grudges" },
            { threshold: 20, description: "Often holds grudges" },
            { threshold: 60, description: "Always holds long-lasting grudges" }
        ]
    },
    positivity: {
        name: "Positivity",
        description: "How positive or optimistic your character's interactions are",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Extremely negative outlook" },
            { threshold: -60, description: "Generally pessimistic" },
            { threshold: -20, description: "Balanced outlook" },
            { threshold: 20, description: "Generally optimistic" },
            { threshold: 60, description: "Extremely positive outlook" }
        ]
    },
    openness: {
        name: "Openness",
        description: "How willing your character is to share personal thoughts and feelings",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Extremely private and guarded" },
            { threshold: -60, description: "Generally reserved" },
            { threshold: -20, description: "Moderately open" },
            { threshold: 20, description: "Quite open and sharing" },
            { threshold: 60, description: "Completely open and transparent" }
        ]
    },
    formality: {
        name: "Formality",
        description: "How formal or casual your character's communication style is",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Very casual and informal" },
            { threshold: -60, description: "Mostly casual" },
            { threshold: -20, description: "Mix of formal and casual" },
            { threshold: 20, description: "Generally formal" },
            { threshold: 60, description: "Extremely formal and proper" }
        ]
    },
    conflict_initiation: {
        name: "Conflict Initiation",
        description: "How likely your character is to initiate or engage in conflicts",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Always avoids conflict" },
            { threshold: -60, description: "Usually avoids conflict" },
            { threshold: -20, description: "Sometimes engages in conflict" },
            { threshold: 20, description: "Often initiates conflict" },
            { threshold: 60, description: "Actively seeks out conflict" }
        ]
    },
    influence_seeking: {
        name: "Influence Seeking",
        description: "How actively your character seeks to influence others",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Never tries to influence others" },
            { threshold: -60, description: "Rarely tries to influence others" },
            { threshold: -20, description: "Sometimes tries to influence others" },
            { threshold: 20, description: "Often tries to influence others" },
            { threshold: 60, description: "Always trying to influence others" }
        ]
    },
    inquisitiveness: {
        name: "Inquisitiveness",
        description: "How often your character asks questions and seeks information",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Never asks questions" },
            { threshold: -60, description: "Rarely asks questions" },
            { threshold: -20, description: "Sometimes asks questions" },
            { threshold: 20, description: "Often asks questions" },
            { threshold: 60, description: "Constantly asking questions" }
        ]
    },
    humor: {
        name: "Humor",
        description: "How often your character uses humor in interactions",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Never uses humor" },
            { threshold: -60, description: "Rarely uses humor" },
            { threshold: -20, description: "Sometimes uses humor" },
            { threshold: 20, description: "Often uses humor" },
            { threshold: 60, description: "Always trying to be humorous" }
        ]
    },
    depth: {
        name: "Depth",
        description: "How deep or superficial your character's interactions tend to be",
        category: 'content',
        valueRanges: [
            { threshold: -100, description: "Very superficial interactions" },
            { threshold: -60, description: "Generally superficial" },
            { threshold: -20, description: "Mix of deep and superficial" },
            { threshold: 20, description: "Generally deep interactions" },
            { threshold: 60, description: "Always seeks deep meaningful interactions" }
        ]
    }
};

/**
 * Gets the description for a given attribute value by finding the highest threshold
 * that the value meets or exceeds.
 */
export function getAttributeValueDescription(attribute: keyof CharacterAttributes, value: number): string {
    const metadata = attributeMetadata[attribute];
    if (!metadata.valueRanges) return '';

    // Sort by threshold in descending order and find the first threshold that the value meets
    const matchingRange = [...metadata.valueRanges]
        .sort((a, b) => b.threshold - a.threshold)
        .find(range => value >= range.threshold);

    return matchingRange?.description || '';
}