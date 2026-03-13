export const SystemFooter = () => {
  // 模拟诊断信息
  const diagnostics = {
    error: '403_FORBIDDEN',
    ray: '9db14ccd3a71dbb5',
    ip: '240e:45c:ce60:3f48:f15c:2d27:4c8c:5f7e',
    time: new Date().toLocaleTimeString('zh-CN', { hour12: false })
  }

  return (
    <footer className="border-t border-cyber-red/30 mt-8 bg-black/90">
      <div className="container mx-auto px-3 py-4">
        <div className="space-y-2 text-xs">
          <div className="flex flex-wrap gap-4 text-cyber-red/80">
            <span className="font-bold">SYSTEM DIAGNOSTICS:</span>
            <span>ERROR_CODE: {diagnostics.error}</span>
            <span>RAY_ID: {diagnostics.ray}</span>
            <span className="hidden sm:inline">CLIENT_IP: {diagnostics.ip}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-cyber-cyan/70">
            <span>TIME: {diagnostics.time}</span>
            <span>UPTIME: 99.97%</span>
            <span>CONNECTION: SECURE</span>
          </div>
          <div className="flex gap-4 pt-2">
            <a href="#" className="terminal-link text-xs">接入视频信号源 (YOUTUBE)</a>
            <a href="#" className="terminal-link text-xs">联系管理员 (CONTACT ADMIN)</a>
          </div>
        </div>
      </div>
    </footer>
  )
}