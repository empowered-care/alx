from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from uuid import UUID
from datetime import datetime

from app.api import deps
from app.models.models import User, CommunityWatch

router = APIRouter()

@router.post("/add-peer")
def add_peer(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    peer_email: str
) -> Any:
    """
    Add a peer to watch.
    """
    statement = select(User).where(User.email == peer_email)
    peer = db.exec(statement).first()
    if not peer:
        raise HTTPException(status_code=404, detail="Peer not found")
    
    watch = CommunityWatch(
        user_id=current_user.id,
        peer_id=peer.id,
        status="ACTIVE"
    )
    db.add(watch)
    db.commit()
    return {"status": "success", "peer_name": peer.name}

@router.get("/peers")
def get_peers(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get list of peers I am watching and peers watching me.
    """
    # Peers I am watching
    statement1 = select(CommunityWatch).where(CommunityWatch.user_id == current_user.id)
    watching = db.exec(statement1).all()
    
    # Peers watching me
    statement2 = select(CommunityWatch).where(CommunityWatch.peer_id == current_user.id)
    watched_by = db.exec(statement2).all()
    
    return {
        "watching": watching,
        "watched_by": watched_by
    }

@router.post("/check-in")
def peer_check_in(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Perform a wellness check-in.
    """
    statement = select(CommunityWatch).where(CommunityWatch.user_id == current_user.id)
    watches = db.exec(statement).all()
    
    for watch in watches:
        watch.last_check_in = datetime.utcnow()
        db.add(watch)
    
    db.commit()
    return {"status": "success", "message": "Check-in recorded for all peers."}
