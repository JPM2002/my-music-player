import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const musicDir = path.join(process.cwd(), "public", "Music");

    try {
        const files = fs.readdirSync(musicDir);
        const mp3Files = files.filter(file => file.endsWith(".mp3"));

        res.status(200).json(mp3Files);
    } catch (error) {
        console.error("Error reading Music folder:", error);
        res.status(500).json({ error: "Could not load songs" });
    }
}
