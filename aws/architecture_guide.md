# AWS Production Infrastructure & Deployment Architecture

This document details the target cloud deployment blueprint for **AI Startup Builder** on Amazon Web Services (AWS).

---

## Architecture Diagram Overview

```
[ User Web Client ] 
        │
        ▼ (HTTPS / DNS)
[ AWS CloudFront CDN Edge ] 
        │
   ┌────┴───────────────────────────┐
   │                                │
   ▼ (Static Assets & Exports)      ▼ (Dynamic App Traffic)
[ AWS S3 Bucket ]          [ AWS Application Load Balancer ]
                                    │
                                    ▼ (VPC Private Subnet)
                         [ AWS ECS Fargate Tasks ]
                            (Next.js App Router Container)
                                    │
               ┌────────────────────┴────────────────────┐
               │                                         │
               ▼ (Auth & Storage)                        ▼ (AI Inference Engine)
    [ Supabase PostgreSQL ]                       [ Google Gemini / OpenAI API ]
    (Row-Level Security Active)                     (Structured JSON Generation)
```

---

## Key Components & Infrastructure Specifications

### 1. Edge & Content Delivery (AWS CloudFront)
- **Global CDN:** Caches static assets, landing page wireframes, and export bundles.
- **DDoS Protection:** Integrated AWS Shield Standard and WAF rate-limiting rules (100 requests/minute per IP).
- **SSL/TLS Certificate:** AWS Certificate Manager (ACM) managed SSL termination at edge locations.

### 2. Application Tier (AWS ECS Fargate)
- **Containerization:** Next.js 14 App Router packaged as lightweight Docker image (`node:18-alpine`).
- **Autoscaling:** Auto-scales container task instances from 2 tasks to 10 tasks based on CPU utilization (> 70%) and HTTP request count per target.
- **Serverless Compute:** Zero EC2 server maintenance overhead via AWS Fargate.

### 3. Storage Tier (AWS S3)
- **S3 Bucket:** `ai-startup-builder-assets-production`
- **Asset Types:** Generated pitch deck exports, database schema `.sql` files, export `.json` and `.md` blueprints.
- **Lifecycle Policy:** Automatically transitions logs to S3 Glacier after 90 days.

### 4. Database Security & Isolated Tenants (Supabase PostgreSQL / AWS RDS)
- **Row-Level Security (RLS):** All data requests are filtered at database level by tenant UID (`auth.uid() = user_id`).
- **Automated Backups:** Daily point-in-time recovery (PITR) with 30-day retention window.
- **Connection Pooling:** PgBouncer instance configured for high-concurrency client pooling.

---

## Deployment Steps with Terraform

```bash
# 1. Navigate to terraform directory
cd aws/terraform

# 2. Initialize Terraform modules
terraform init

# 3. Preview deployment plan
terraform plan

# 4. Apply cloud configuration
terraform apply -auto-approve
```
