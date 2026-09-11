# Architecture of this POC
        We'll build 3 microservices that talk to each other inside a Podman Pod (mimicking Kubernetes):

┌─────────────────────────────────────────────────────────┐
│                  POD: mern-microservices-pod            │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐  ┌─────────────┐   │
│  │  API Gateway │──▶│ User Service │─▶│   MongoDB   │   │
│  │  (Port 3000) │   │  (Port 3001) │  │  Port 27017 │   │
│  │              │   │              │  │             │   │
│  │              │──▶│Product Service│─▶│            │   │
│  │              │   │  (Port 3002) │  │             │   │
│  └──────────────┘   └──────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────┘
Why this matters: All containers in a Podman pod share the same network namespace — they talk via localhost, exactly like Kubernetes pods. This is a key Podman advantage over Docker.

## Important: 
Podman uses exactly the same Dockerfile syntax as Docker. This is intentional — it's OCI-compliant. So you don't need a "Podmanfile".

### Where the Cost Savings Actually Come From:
You didn't just "avoid Docker" — you unlocked specific savings. Here's the breakdown:

1. No Licensing Fees:
    Docker Desktop: **$21/user/month** for companies >250 employees or >$10M revenue
    Podman Desktop: $0 forever
For 10 devs → $2,520/year saved

2. Less Memory, More Containers Per Machine:
    Docker daemon uses ~140 MB RAM even when idle
    Podman has no daemon → 0 MB idle overhead
On 20 CI runners → saves ~$1,600/year in AWS costs

3. Rootless = Fewer Security Findings:
    Docker daemon runs as root — one CVE = full host compromise
    Podman runs containers as your user — breach is contained
Savings: fewer audit findings, less remediation time, cheaper compliance

4. One-Command Kubernetes Path:
    Docker → K8s: manual YAML writing, or third-party tools
    Podman → K8s: podman generate kube my-pod > deploy.yaml
Savings: hours of engineering time per deployment

5. Native Systemd = No Custom Process Manager:
    Docker: needs --restart=always + daemon running to survive reboot
    Podman: systemctl --user enable my-container.service — done
Savings: simpler ops, fewer scripts to maintain