export const agentTypes = ["Property Broker", "Travel Agent", "Insurance Agent", "Stock Broker", "Legal Agent", "Advertising Agent", "Health Agent", "Contractor"] as const;

export type AgentType = typeof agentTypes[number];


export const data: {
    name: string;
    type: AgentType | AgentType[];
    rating: number; // Add a rating field
}[] = [
    {
        name: "Upendra Khanna",
        type: "Property Broker",
        rating: 4.32,
        index: 0
    },
    {
        name: "Indira Shukla",
        type: "Health Agent",
        rating: 3.78,
        index: 1
    },
    {
        name: "Jaya Banerjee",
        type: ["Travel Agent", "Property Broker"],
        rating: 4.96,
        index: 2,
    },
    {
        name: "Bhagwati Dutta",
        type: "Stock Broker",
        rating: 2.64,
        index: 3
    },
    {
        name: "Rahul Sharma",
        type: ["Legal Agent", "Advertising Agent"],
        rating: 3.89,
        index: 4
    },
    {
        name: "Aaditya Joshi",
        type: "Insurance Agent",
        rating: 4.15,
        index: 5
    },
    {
        name: "Ashlesh Talwar",
        type: "Travel Agent",
        rating: 5.00, 
        index: 6
    },
    { 
        name: "Rajinder Trivedi",
        type: "Insurance Agent",
        rating: 4.27,
        index: 7
    }
];

export function sortByRating(data: { name: string; type: AgentType | AgentType[]; rating: number; }[]): { name: string; type: AgentType | AgentType[]; rating: number; }[] {
    return data.sort((a, b) => b.rating - a.rating);
}
