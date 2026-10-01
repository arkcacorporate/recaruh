import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const downloads = [
  // Hero Images
  {
    dest: "images/hero/step-1.jpg",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80",
    name: "Hero Step 1 (Job Applications)",
  },
  {
    dest: "images/hero/step-2.jpg",
    url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80",
    name: "Hero Step 2 (Resume Building)",
  },
  {
    dest: "images/hero/step-3.jpg",
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
    name: "Hero Step 3 (Interview Preparation)",
  },
  {
    dest: "images/hero/step-4.jpg",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    name: "Hero Step 4 (Campus Hiring)",
  },
  {
    dest: "images/hero/step-5.jpg",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
    name: "Hero Step 5 (Job Posting)",
  },
  {
    dest: "images/hero/step-6.jpg",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    name: "Hero Step 6 (AI Candidate Selection)",
  },

  // Service Images (All 6)
  {
    dest: "images/services/job-applications.jpg",
    url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
    name: "Service 1 (Job Applications)",
  },
  {
    dest: "images/services/resume-building.jpg",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    name: "Service 2 (Resume Building)",
  },
  {
    dest: "images/services/interview-preparation.jpg",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    name: "Service 3 (Interview Preparation)",
  },
  {
    dest: "images/services/campus-hiring.jpg",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    name: "Service 4 (Campus Hiring)",
  },
  {
    dest: "images/services/job-posting.jpg",
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    name: "Service 5 (Job Posting)",
  },
  {
    dest: "images/services/ai-candidate-selection.jpg",
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    name: "Service 6 (AI Candidate Selection)",
  },

  // About Images
  {
    dest: "images/about/about-1.jpg",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    name: "About 1 (Office)",
  },
  {
    dest: "images/about/about-2.jpg",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    name: "About 2 (Team)",
  },
];

async function downloadFile(url, targetPath, name) {
  const dir = path.dirname(targetPath);
  await fsp.mkdir(dir, { recursive: true });

  console.log(`Downloading: ${name}...`);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fsp.writeFile(targetPath, buffer);
    console.log(`  ✓ Saved to ${path.relative(rootDir, targetPath)} (${(buffer.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ✗ Failed downloading ${name}: ${err.message}`);
    // If local file already exists, don't break
    if (fs.existsSync(targetPath)) {
      console.log(`    → Existing local file retained: ${path.relative(rootDir, targetPath)}`);
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log("=========================================");
  console.log("RECARUH Asset Downloader");
  console.log(`Target directory: ${publicDir}`);
  console.log("=========================================\n");

  let successCount = 0;
  for (const item of downloads) {
    const target = path.join(publicDir, item.dest);
    try {
      await downloadFile(item.url, target, item.name);
      successCount++;
    } catch (e) {
      console.error(`Error processing ${item.name}:`, e.message);
    }
  }

  // Also ensure legacy paths about/office.jpg and about/team.jpg have copies if needed
  try {
    const about1 = path.join(publicDir, "images/about/about-1.jpg");
    const office = path.join(publicDir, "images/about/office.jpg");
    if (fs.existsSync(about1) && !fs.existsSync(office)) {
      await fsp.copyFile(about1, office);
    }
    const about2 = path.join(publicDir, "images/about/about-2.jpg");
    const team = path.join(publicDir, "images/about/team.jpg");
    if (fs.existsSync(about2) && !fs.existsSync(team)) {
      await fsp.copyFile(about2, team);
    }
  } catch {}

  console.log("\n=========================================");
  console.log(`Download complete! Successfully processed ${successCount}/${downloads.length} images.`);
  console.log("=========================================");
}

main().catch((err) => {
  console.error("Fatal download error:", err);
  process.exit(1);
});
